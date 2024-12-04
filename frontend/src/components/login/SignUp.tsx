import React, { useState } from "react";
import axios from "axios";

import { useAlert } from "../../context/AlertContext";

interface SignUpProps {
    toggle: () => void;
}

interface FormState {
    username: string;
    password: string;
    faction: string;
}

interface FormErrors {
    username?: string;
    password?: string;
    faction?: string;
}

const SignUp: React.FC<SignUpProps> = (toggle) => {
    const [formState, setFormState] = useState<FormState>({ username: "", password: "", faction: "COSMIC" });
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const { addAlert } = useAlert();

    const apiURL = import.meta.env.VITE_API_URL || "http://localhost:5000"

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

        if (!formState.username.trim()) {
            errors.username = "Username is required";
        }

        if (!formState.password.trim()) {
            errors.password = "Password is required";
        } 
        else if (
            formState.password.length < 6 ||
            !/[A-Z]/.test(formState.password) ||
            !/[a-z]/.test(formState.password) ||
            !/[0-9]/.test(formState.password) ||
            !/[!@#$%^&*(),.?":{}|<>]/.test(formState.password)
        ) {
            errors.password =
                "Password must be at least 6 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log("Form submitted successfully:", formState);
            handleSignUp(formState);
        }
    };

    const handleSignUp = async (formState: FormState) => {
        try {
            const response = await axios.post( apiURL+'/auth/signup', { ...formState }, { withCredentials: true });

            if (response.data.message) {
                addAlert('Signup successful!', 'success');
                toggle;
            }
        } catch (error: any) {
            addAlert(error.response?.data?.error || 'An error occurred during signup.', 'error');
        }
    };

    return (
        <div className='sign-up-container'>
            <h1>Sign Up</h1>
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
                <div>
                    <select
                        id="faction"
                        name="faction"
                        value={formState.faction}
                        onChange={handleChange}
                        className="p-2 w-full"
                    >
                        <option value="COSMIC">COSMIC</option>
                        <option value="GALACTIC">GALACTIC</option>
                        <option value="QUANTUM">QUANTUM</option>
                        <option value="DOMINION">DOMINION</option>
                        <option value="ASTRO">ASTRO</option>
                        <option value="CORSAIRS">CORSAIRS</option>
                        <option value="VOID">VOID</option>
                        <option value="OBSIDIAN">OBSIDIAN</option>
                        <option value="AEGIS">AEGIS</option>
                        <option value="UNITED">UNITED</option>
                    </select>
                    {formErrors.faction && <p className="text-red-600">{formErrors.faction}</p>}
                </div>
                <button type="submit" className="bg-slate-500 text-white px-4 py-2 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default SignUp;