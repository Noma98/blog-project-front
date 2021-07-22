import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function withAuth(SpecificComponent, option) {
    /*option
    null: 아무나, true: 로그인한 유저만, false: 일반 유저만*/
    function AuthCheck(props) {
        const history = useHistory();
        useEffect(() => {
            const fectchData = async () => {
                const res = await axios.get("/api/users/auth");
                const { isAuth } = res.data;
                if (isAuth && option === false) {
                    history.push("/");
                } else if (option === true) {
                    history.push("/");
                };
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