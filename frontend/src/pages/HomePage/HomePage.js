import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import './HomePage.css';

const Homepage = () => {
    const [user, token] = useAuth();

    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                let response = await axios.get(
                    'http://127.0.0.1:5000/api/user',    
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }
                );
                console.log(response.data)
                user = response.data; 
            } catch (error) {
                console.log(error.response.data);
            }
        };
        fetchUserDetails();
    }, [token]);

    return (
        <div className="homepage">
            <h1 className='welcome'>Welcome back, {user && capitalizeFirstLetter(user.first_name)}!</h1>
            <div className="box-container">
                <Link to="/tasks" className="box">
                    <h2>Tasks</h2>
                </Link>
                <Link to="/rewards" className="box">
                    <h2>Rewards</h2>
                </Link>
                <Link to="/trends" className="box">
                    <h2>Trends</h2>
                </Link>
            </div>
        </div>
    );
};

export default Homepage;
