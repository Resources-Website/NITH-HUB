import React, { useState } from 'react';
import { auth, provider, signInWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [photoURL, setPhotoURL] = useState(null); // Add this state
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setPhotoURL(result.user.photoURL); // Update the photo URL state
            navigate('/');
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };

    const signInWithEmail = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            console.error("Error signing in with email", error);
        }
    };

    const signInWithPhone = async () => {
        try {
            const appVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
            const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
            setConfirmationResult(confirmation);
        } catch (error) {
            console.error("Error signing in with phone", error);
        }
    };

    const verifyCode = async () => {
        try {
            await confirmationResult.confirm(verificationCode);
            navigate('/');
        } catch (error) {
            console.error("Error verifying code", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6">Sign In</h2>
                <button
                    onClick={signInWithGoogle}
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mb-4"
                >
                    {photoURL ? (
                        <img src={photoURL} alt="User Profile" className="w-8 h-8 rounded-full" />
                    ) : (
                        'Sign In with Google'
                    )}
                </button>
                <div className="mb-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Password"
                    />
                    <button
                        onClick={signInWithEmail}
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mt-2"
                    >
                        Sign In with Email
                    </button>
                </div>
                <div className="mb-4">
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                        placeholder="Phone Number"
                    />
                    <div id="recaptcha-container"></div>
                    <button
                        onClick={signInWithPhone}
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mt-2"
                    >
                        Sign In with Phone
                    </button>
                </div>
                {confirmationResult && (
                    <div className="mb-4">
                        <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Verification Code"
                        />
                        <button
                            onClick={verifyCode}
                            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mt-2"
                        >
                            Verify Code
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignIn;
