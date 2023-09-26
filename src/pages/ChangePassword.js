
import {useApplicationContext} from "../components/AuthContext";
import {useEffect} from "react";
import PasswordInput from "../components/PasswordInput";
import CustomButton from "../components/CustomButton";
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
                <br/>
                <CustomButton id={"changePassword"} text={"Changer"} onPress={() => changePassword(
                    document.getElementById("newPassword").value,
                    document.getElementById("confirmPassword").value,
                    new URLSearchParams(window.location.search).get('token'))} />
        </div>
    );
};

export default ChangePassword;
