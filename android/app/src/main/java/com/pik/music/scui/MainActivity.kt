package com.pik.music.scui

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.pik.music.scui.auth.UserSession
import com.pik.music.scui.ui.login.LoginScreen
import com.pik.music.scui.ui.placeholder.PlaceholderHomeScreen
import com.pik.music.scui.ui.theme.DeepNavy
import com.pik.music.scui.ui.theme.PiKMusicTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            PiKMusicTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = DeepNavy
                ) {
                    var currentSession by remember { mutableStateOf<UserSession?>(null) }

                    if (currentSession == null) {
                        LoginScreen(
                            onGoogleSignInClick = {
                                // In production, Google Credential Manager returns the user session:
                                currentSession = UserSession.Google(
                                    id = "usr_google_sample",
                                    email = "khushrathod223@gmail.com",
                                    displayName = "Khush Rathod"
                                )
                            },
                            onGuestClick = {
                                currentSession = UserSession.Guest(
                                    guestId = "${(1000..9999).random()}"
                                )
                            }
                        )
                    } else {
                        PlaceholderHomeScreen(
                            session = currentSession!!,
                            onSignOut = {
                                currentSession = null
                            }
                        )
                    }
                }
            }
        }
    }
}
