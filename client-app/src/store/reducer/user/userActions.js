import { call, put } from 'redux-saga/effects'
import { SIGNIN_FAILURE, REGISTER_FAILURE, SIGNOUT_FAILURE, HANDLE_AUTH_STATE_CHANGE_SUCCESS, HANDLE_AUTH_STATE_CHANGE_FAILURE } from './userActionTypes'
import { signoutFirebase, createUserWithEmail, signInToFirebaseWithEmail, signinWithGooglePopup, getFirebaseIdToken, getCurrentUser } from '../../../firebase/auth'
import { syncUser } from '../../../api/user'

export function* signin({ payload }) {
    try {
        yield call(signInToFirebaseWithEmail, payload.email, payload.password)
    } catch (error) {
        yield put({
            type: SIGNIN_FAILURE,
            payload: error
        })
    }
}

export function* signinWithGoogle() {
    try {
        const googleRes = yield call(signinWithGooglePopup)

        if (!googleRes) {
            yield put({
                type: SIGNIN_FAILURE,
                payload: { message: "Please select your google account" }
            })
            return;
        }

    } catch (error) {
        yield put({
            type: SIGNIN_FAILURE,
            payload: error
        })
    }
}

export function* register({ payload }) {
    try {
        yield call(createUserWithEmail, payload.email, payload.password)
    } catch (error) {
        yield put({
            type: REGISTER_FAILURE,
            payload: error
        })
    }
}

export function* signout({ payload }) {
    try {
        yield call(signoutFirebase)
        payload.success()
    } catch (error) {
        yield put({
            type: SIGNOUT_FAILURE,
            payload: error
        })
    }
}

export function* handleAuthStateChange() {
    try {
        const user = getCurrentUser()
        let idToken = null

        if (user) {
            idToken = yield call(getFirebaseIdToken)
            yield call(syncUser, idToken)
        }

        yield put({
            type: HANDLE_AUTH_STATE_CHANGE_SUCCESS,
            payload: {
                user: user,
                idToken: idToken
            }
        })
    } catch (error) {
        yield put({
            type: HANDLE_AUTH_STATE_CHANGE_FAILURE,
            payload: error
        })
    }
}