import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function withAuth(SpecificComponent, option) {
    /*option
    null: 아무나, true: 로그인한 유저만, false: 일반 유저만*/
    function AuthCheck(props) {
        const history = useHistory();
        useEffect(async () => {
            const res = await axios.get("/api/users/auth");
            console.log(res.data);
            if (res.data.isAuth && option === false) {
                history.push("/");
            } else if (option === true) {
                history.push("/");
            };
        }, [])
        return (
            <SpecificComponent {...props} />
        );
    }
    return AuthCheck;
}
export default withAuth;