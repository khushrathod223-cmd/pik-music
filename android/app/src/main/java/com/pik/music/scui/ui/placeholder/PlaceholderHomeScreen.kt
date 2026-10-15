package com.pik.music.scui.ui.placeholder

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.pik.music.scui.auth.UserSession
import com.pik.music.scui.ui.theme.*

@Composable
fun PlaceholderHomeScreen(
    session: UserSession,
    onSignOut: () -> Unit,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .fillMaxSize()
            .background(DeepNavy)
            .padding(24.dp),
        contentAlignment = Alignment.Center
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(24.dp))
                .background(StudioCardBg)
                .border(1.5.dp, NeonCyan.copy(alpha = 0.5f), RoundedCornerShape(24.dp))
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Text(
                text = "PiK Music SCuII",
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                color = NeonCyan
            )

            Surface(
                shape = RoundedCornerShape(12.dp),
                color = NeonCyan.copy(alpha = 0.1f)
            ) {
                Text(
                    text = "Temporary Placeholder Screen",
                    color = NeonCyan,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.SemiBold,
                    modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp)
                )
            }

            // Session info
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
                    .background(Color(0xFF030712))
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                when (session) {
                    is UserSession.Google -> {
                        Text("Signed In Account:", fontSize = 12.sp, color = TextMuted)
                        Text(session.displayName, fontSize = 16.sp, fontWeight = FontWeight.Bold, color = TextWhite)
                        Text(session.email, fontSize = 12.sp, color = NeonCyan)
                        Text("Auth Mode: Google OAuth 2.0", fontSize = 11.sp, color = TextMuted)
                    }
                    is UserSession.Guest -> {
                        Text("Session Type:", fontSize = 12.sp, color = TextMuted)
                        Text("Guest Explorer", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = TextWhite)
                        Text("Guest ID: ${session.guestId}", fontSize = 12.sp, color = NeonCyan)
                    }
                }
            }

            Text(
                text = "Authentication successful. This temporary screen holds the active session until the final home screen design is provided.",
                color = TextMuted,
                fontSize = 12.sp,
                textAlign = TextAlign.Center,
                lineHeight = 16.sp
            )

            Button(
                onClick = onSignOut,
                colors = ButtonDefaults.buttonColors(containerColor = NeonCyan),
                shape = RoundedCornerShape(12.dp),
                modifier = Modifier.fillMaxWidth().height(48.dp)
            ) {
                Text(
                    text = "Sign Out / Return to Login",
                    color = DeepNavy,
                    fontWeight = FontWeight.Bold
                )
            }
        }
    }
}
