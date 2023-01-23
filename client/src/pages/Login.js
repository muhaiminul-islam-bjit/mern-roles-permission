import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../assets/images/logo.svg";
import Container from "../components/ui/atom/container";
import Error from "../components/ui/Error";
import { useLoginMutation } from "../features/auth/authApi";
import './login.css';

export default function Login() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [login, { data, isLoading, error: responseError }] =
        useLoginMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (responseError?.data) {
            setError(responseError.data.message);
        }
        if (data?.accessToken && data?.user) {
            navigate("/inbox");
        }

    }, [data, responseError, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        setError("");

        login({
            phone,
            password,
        });
    };

    return (
        <div className="login__wrapper">
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <Link to="/">
                            <img
                                className="mx-auto h-12 w-auto"
                                src={logoImage}
                                alt="Learn with sumit"
                                height="150px"
                                width="250px"
                            />
                        </Link>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="sr-only"
                                >
                                    Phone
                                </label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="number"
                                    autoComplete="phone"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <Container margin={16}>
                            <Button
                                type="default" htmlType="submit"
                                disabled={isLoading}
                            >
                                Sign in
                            </Button>
                        </Container>

                        {error !== "" && <Error message={error} />}
                    </form>
                </div>
            </div>
        </div>
    );
}