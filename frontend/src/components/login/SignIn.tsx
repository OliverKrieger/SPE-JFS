import React, { useState } from "react";
import axios from "axios";

import { useAlert } from "../../context/AlertContext";

import { useDispatch } from 'react-redux';
import { login } from "../../store/authSlice";

interface FormState {
    username: string;
    password: string;
}

interface FormErrors {
    username?: string;
    password?: string;
}

const SignIn: React.FC = () => {
    const [formState, setFormState] = useState<FormState>({ username: "", password: "" });
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const { addAlert } = useAlert();

    const dispatch = useDispatch();

    const apiURL = import.meta.env.VITE_API_URL || "http://localhost:5000"

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });

        setFormErrors({
            ...formErrors,
            [name]: "",
        });
    };

    const validate = (): boolean => {
        const errors: FormErrors = {};
        if (!formState.username) {
            errors.username = "Username is required";
        } else if (formState.password.length < 0) {
            errors.username = "Username is invalid";
        }

        if (!formState.password) {
            errors.password = "Password is required";
        } else if (formState.password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log("Form submitted successfully:", formState);
            handleSignIn(formState);
        }
    };

    const handleSignIn = async (formState: FormState) => {
        try {
            const response = await axios.post( apiURL+'/auth/signin', { ...formState }, { withCredentials: true });

            if (response.data.message) {
                dispatch(login({
                    userId: response.data.user.userId,
                    username: response.data.user.username,
                    faction: response.data.user.faction
                }));

                addAlert(`Signin for ${response.data.user.username} successful!`, 'success');
            }
        } catch (error: any) {
            addAlert(error.response?.data?.error || 'An error occurred during signup.', 'error');
        }
    };

    return (
        <div className='sign-in-container'>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit} className="my-6 space-y-6 flex flex-col">
                <div>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formState.username}
                        placeholder="username"
                        onChange={handleChange}
                        className="p-2 w-full"
                    />
                    {formErrors.username && <p className="text-red-600">{formErrors.username}</p>}
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formState.password}
                        placeholder="password"
                        onChange={handleChange}
                        className="p-2 w-full"
                    />
                    {formErrors.password && <p className="text-red-600">{formErrors.password}</p>}
                </div>
                <button type="submit" className="bg-slate-500 text-white px-4 py-2 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default SignIn;