import { put } from 'redux-saga/effects'
import { CHECK_SESSION_STATUS, SIGNIN_REQUEST, SIGNIN_SUCCESS } from './userActionTypes'
import UserManager from "../../../oidc/userManager"

export function signin() {
    try {
        UserManager.signinRedirect();
    } catch (error) {
        console.log(error)
    }
}

export function signout() {
    try {
        UserManager.signoutRedirect();
    } catch (error) {
        console.log(error)
    }
}

export function* checkSessionStatus({ payload }) {
    try {
        var user = yield UserManager.signinRedirectCallback()
        if (user) {
            yield put({
                type: SIGNIN_SUCCESS,
                payload: user
            })
            payload.onLoggedIn()
        }
    } catch (error) {
        console.log(error)
        yield put({
            type: SIGNIN_REQUEST,
        })
    }
}
