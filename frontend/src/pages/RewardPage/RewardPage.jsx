import { useEffect, useState } from 'react';
import React from 'react'
import RewardList from '../../components/RewardList/RewardList';
import RewardForm from '../../components/RewardForm/RewardForm';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";

const RewardPage = () => {

    const [user, token] = useAuth();
    const [rewards, setRewards] = useState([]);

    useEffect(() => {
        const fetchRewards = async () => {
          try {
            let response = await axios.get(
            'http://127.0.0.1:5000/api/user_rewards',    
            {
                headers: {
                  Authorization: "Bearer " + token,
                },
              });
              console.log(response.data)
              setRewards(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchRewards();
  }, [token]);
    return ( 
        <div>
            <RewardList 
            user={user}
            rewards={rewards}
            setRewards={setRewards} 
            />
            <RewardForm />
        </div>
     );
}
 
export default RewardPage;