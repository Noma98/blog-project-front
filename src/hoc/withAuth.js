import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function withAuth(SpecificComponent, option) {
    /*option
    null:누구나(로그인OX), true: 로그인O만, false:로그인X만*/
    function AuthCheck(props) {
        const history = useHistory();
        const API_URL = process.env.REACT_APP_API_URL;
        useEffect(() => {
            const fectchData = async () => {
                const res = await axios.get(`${API_URL}/api/users/auth`, {
                    withCredentials: true
                });
                const loggedIn = res.data.success; //true, false
                loggedIn && (option === false) && history.push("/");
                !loggedIn && (option === true) && history.push("/login");
            }
            fectchData();
        }, [history])
        return (
            <SpecificComponent {...props} />
        );
    }
    return AuthCheck;
}
export default withAuth;