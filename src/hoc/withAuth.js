import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function withAuth(SpecificComponent, option) {
    /*option
    true: 로그인한 유저만, false: 일반 유저만*/
    function AuthCheck(props) {
        const history = useHistory();
        useEffect(() => {
            const fectchData = async () => {
                const res = await axios.get("/api/users/auth");
                const { isAuth } = res.data;
                isAuth && !option && history.push("/");
                !isAuth && option && history.push("/login");
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