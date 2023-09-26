
import {useApplicationContext} from "../components/AuthContext";
import {useEffect} from "react";
import PasswordInput from "../components/PasswordInput";
const ChangePassword = () => {

    const { changePassword } = useApplicationContext();

    useEffect(() => {
        console.log("ChangePassword");
    });

    return (
        <div>
            <h2>Changer le mot de passe</h2>
                <div>
                    <label>Nouveau mot de passe:</label>
                    <PasswordInput id={"newPassword"} />
                </div>
                <div>
                    <label>Confirmer le nouveau mot de passe:</label>
                    <PasswordInput id={"confirmPassword"} />
                </div>
                <button onClick={() => changePassword(
                    document.getElementById("newPassword").value,
                    document.getElementById("confirmPassword").value,
                    new URLSearchParams(window.location.search).get('token'))} >Changer</button>
        </div>
    );
};

export default ChangePassword;
