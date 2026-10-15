package com.pik.music.scui.auth

sealed interface UserSession {
    data class Google(
        val id: String,
        val email: String,
        val displayName: String,
        val idToken: String? = null
    ) : UserSession

    data class Guest(
        val guestId: String,
        val sessionTimestamp: Long = System.currentTimeMillis()
    ) : UserSession
}

sealed interface LoginUiState {
    data object Idle : LoginUiState
    data object Loading : LoginUiState
    data class Success(val session: UserSession) : LoginUiState
    data class Error(val message: String) : LoginUiState
}
