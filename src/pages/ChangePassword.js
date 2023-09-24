
import {useApplicationContext} from "../components/AuthContext";
const ChangePassword = () => {

    const { changePassword } = useApplicationContext();


    return (
        <div>
            <h2>Changer le mot de passe</h2>
                <div>
                    <label>Nouveau mot de passe:</label>
                    <input
                        type="password"
                        id={"newPassword"}

                    />
                </div>
                <div>
                    <label>Confirmer le nouveau mot de passe:</label>
                    <input
                        type="password"
                        id={"confirmPassword"}
                    />
                </div>
                <button onClick={() => changePassword(
                    document.getElementById("newPassword").value,
                    document.getElementById("confirmPassword").value,
                    new URLSearchParams(window.location.search).get('token'))} >Changer</button>
        </div>
    );
};

export default ChangePassword;
