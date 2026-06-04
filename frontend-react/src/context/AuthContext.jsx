import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Check if user is admin
                const adminDoc = await getDoc(doc(db, 'admins', firebaseUser.uid));
                if (adminDoc.exists()) {
                    setUser({ ...firebaseUser, role: 'admin', ...adminDoc.data() });
                } else {
                    // Check if user is regular user
                    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                    if (userDoc.exists()) {
                        setUser({ ...firebaseUser, role: 'user', ...userDoc.data() });
                    } else {
                        // Default if doc doesn't exist yet (shouldn't happen with proper registration)
                        setUser({ ...firebaseUser, role: 'user' });
                    }
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const firebaseUser = result.user;
            
            // For Google Sign-in, we might need to create the user doc if it doesn't exist
            const adminDoc = await getDoc(doc(db, 'admins', firebaseUser.uid));
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            
            if (!adminDoc.exists() && !userDoc.exists()) {
                await setDoc(doc(db, 'users', firebaseUser.uid), {
                    uid: firebaseUser.uid,
                    name: firebaseUser.displayName,
                    email: firebaseUser.email,
                    role: 'user'
                });
            }
            return result;
        } catch (error) {
            console.error("Google login error", error);
            throw error;
        }
    };

    const register = async (email, password, name) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = result.user;
        
        await setDoc(doc(db, 'users', firebaseUser.uid), {
            uid: firebaseUser.uid,
            name: name,
            email: email,
            role: 'user'
        });
        
        return result;
    };

    const logout = () => {
        return signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, register, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
