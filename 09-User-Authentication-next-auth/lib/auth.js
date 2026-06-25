import { verifyPassword } from "./hash";
import { getUserByEmail } from "./user";

export async function login(email, password) {
    const existingUser = getUserByEmail(email);
    if (!existingUser) {
        return null;
    }
    console.log(existingUser);
    

    const isValidPassword =await verifyPassword(existingUser.password, password);
    console.log(isValidPassword);
    if (!isValidPassword) {
        return null;
    }
    

    return {
        id: "1",
        name: existingUser.name,
        email: existingUser.email
    };
}