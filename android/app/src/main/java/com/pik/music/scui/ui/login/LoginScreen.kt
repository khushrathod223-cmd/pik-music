package com.pik.music.scui.ui.login

import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.blur
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.pik.music.scui.auth.UserSession
import com.pik.music.scui.ui.theme.*

@Composable
fun LoginScreen(
    onGoogleSignInClick: () -> Unit,
    onGuestClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    var showTermsDialog by remember { mutableStateOf(false) }

    BoxWithConstraints(
        modifier = modifier
            .fillMaxSize()
            .background(DeepNavy)
    ) {
        val isLandscape = maxWidth > maxHeight

        // Atmospheric studio lighting glow
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    Brush.radialGradient(
                        colors = listOf(
                            Color(0x330051FF),
                            Color(0x1A00E5FF),
                            Color.Transparent
                        )
                    )
                )
        )

        if (isLandscape) {
            // Landscape layout: Split 2-column (Matches Reference Image 1)
            Row(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(32.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                // Left Column: 3D Liquid Logo
                Box(
                    modifier = Modifier.weight(1f),
                    contentAlignment = Alignment.Center
                ) {
                    WaterGlassLogo()
                }

                // Right Column: Buttons & Terms
                Column(
                    modifier = Modifier
                        .weight(1f)
                        .padding(horizontal = 24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    LiquidGlassGoogleButton(onClick = onGoogleSignInClick)
                    NeonGuestButton(onClick = onGuestClick)
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "Terms And Conditions",
                        color = NeonCyan.copy(alpha = 0.8f),
                        fontSize = 12.sp,
                        textDecoration = TextDecoration.Underline,
                        modifier = Modifier.clickable { showTermsDialog = true }
                    )
                }
            }
        } else {
            // Portrait layout: Stacked with Waveform Divider (Matches Reference Image 2)
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(24.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.SpaceBetween
            ) {
                Spacer(modifier = Modifier.height(16.dp))

                // Brand Logo
                WaterGlassLogo()

                // Audio Waveform Divider
                AudioWaveformDivider(modifier = Modifier.padding(vertical = 12.dp))

                // Action Controls
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(16.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    LiquidGlassGoogleButton(onClick = onGoogleSignInClick)
                    NeonGuestButton(onClick = onGuestClick)
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "Terms And Conditions",
                        color = NeonCyan.copy(alpha = 0.8f),
                        fontSize = 12.sp,
                        textDecoration = TextDecoration.Underline,
                        modifier = Modifier.clickable { showTermsDialog = true }
                    )
                }

                Spacer(modifier = Modifier.height(8.dp))
            }
        }
    }

    if (showTermsDialog) {
        AlertDialog(
            onDismissRequest = { showTermsDialog = false },
            title = {
                Text(
                    text = "Terms & Conditions",
                    fontWeight = FontWeight.Bold,
                    color = NeonCyan
                )
            },
            text = {
                Text(
                    text = "By accessing PiK Music SCuII via Google Sign-In or Guest session, you agree to the stream playback terms, fair-use policies, and privacy protocols. No personal telemetry or biometric audio data is collected.",
                    color = TextWhite,
                    fontSize = 13.sp,
                    lineHeight = 18.sp
                )
            },
            confirmButton = {
                Button(
                    onClick = { showTermsDialog = false },
                    colors = ButtonDefaults.buttonColors(containerColor = NeonCyan)
                ) {
                    Text("Accept", color = DeepNavy, fontWeight = FontWeight.Bold)
                }
            },
            containerColor = StudioCardBg
        )
    }
}

@Composable
fun WaterGlassLogo(modifier: Modifier = Modifier) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = modifier
    ) {
        // PiK + music script
        Row(
            verticalAlignment = Alignment.Bottom,
            horizontalArrangement = Arrangement.Center
        ) {
            Text(
                text = "PiK",
                fontSize = 76.sp,
                fontWeight = FontWeight.Black,
                color = Color.White,
                letterSpacing = (-2).sp,
                modifier = Modifier.shadow(16.dp, ambientColor = PurpleNeon, spotColor = NeonCyan)
            )
            Spacer(modifier = Modifier.width(6.dp))
            Text(
                text = "music",
                fontSize = 32.sp,
                fontStyle = FontStyle.Italic,
                fontWeight = FontWeight.Bold,
                color = NeonCyan,
                modifier = Modifier.padding(bottom = 8.dp)
            )
        }

        // SCUI in bold liquid glass text
        Text(
            text = "SCUI",
            fontSize = 72.sp,
            fontWeight = FontWeight.Black,
            color = Color(0xFFE0F2FE),
            letterSpacing = (-1).sp,
            modifier = Modifier.shadow(24.dp, ambientColor = NeonCyan, spotColor = ElectricBlue)
        )
    }
}

@Composable
fun AudioWaveformDivider(modifier: Modifier = Modifier) {
    val infiniteTransition = rememberInfiniteTransition(label = "wave")
    val waveScale by infiniteTransition.animateFloat(
        initialValue = 0.3f,
        targetValue = 1.0f,
        animationSpec = infiniteRepeatable(
            animation = tween(800, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "waveScale"
    )

    Row(
        modifier = modifier
            .fillMaxWidth()
            .height(28.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.Center
    ) {
        Box(
            modifier = Modifier
                .weight(1f)
                .height(1.5.dp)
                .background(
                    Brush.horizontalGradient(
                        listOf(Color.Transparent, NeonCyan)
                    )
                )
        )
        Spacer(modifier = Modifier.width(8.dp))
        Row(
            horizontalArrangement = Arrangement.spacedBy(3.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(Modifier.width(2.5.dp).height((12 * waveScale).dp).background(NeonCyan, CircleShape))
            Box(Modifier.width(2.5.dp).height((20 * waveScale).dp).background(Color.White, CircleShape))
            Box(Modifier.width(2.5.dp).height((14 * waveScale).dp).background(NeonCyan, CircleShape))
        }
        Spacer(modifier = Modifier.width(8.dp))
        Box(
            modifier = Modifier
                .weight(1f)
                .height(1.5.dp)
                .background(
                    Brush.horizontalGradient(
                        listOf(NeonCyan, Color.Transparent)
                    )
                )
        )
    }
}

@Composable
fun LiquidGlassGoogleButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .fillMaxWidth()
            .height(64.dp)
            .clip(RoundedCornerShape(32.dp))
            .background(
                Brush.verticalGradient(
                    colors = listOf(
                        Color(0x8038BDF8),
                        Color(0xB30284C7),
                        Color(0xD90369A1)
                    )
                )
            )
            .border(2.dp, NeonCyan, RoundedCornerShape(32.dp))
            .clickable(onClick = onClick)
            .padding(horizontal = 20.dp),
        contentAlignment = Alignment.Center
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            // Google G badge
            Surface(
                modifier = Modifier.size(38.dp),
                shape = CircleShape,
                color = Color.White,
                shadowElevation = 4.dp
            ) {
                Box(contentAlignment = Alignment.Center) {
                    Text(
                        text = "G",
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF4285F4)
                    )
                }
            }

            Text(
                text = "Sign in with Google",
                color = TextWhite,
                fontSize = 17.sp,
                fontWeight = FontWeight.SemiBold,
                textAlign = TextAlign.Center
            )

            Icon(
                imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                contentDescription = null,
                tint = Color.White,
                modifier = Modifier.size(22.dp)
            )
        }
    }
}

@Composable
fun NeonGuestButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .fillMaxWidth()
            .height(56.dp)
            .clip(RoundedCornerShape(28.dp))
            .background(Color(0xB3040F26))
            .border(2.dp, NeonCyan, RoundedCornerShape(28.dp))
            .clickable(onClick = onClick)
            .padding(horizontal = 24.dp),
        contentAlignment = Alignment.Center
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.Center
        ) {
            Text(
                text = "Continue as Guest",
                color = TextWhite,
                fontSize = 17.sp,
                fontStyle = FontStyle.Italic,
                fontWeight = FontWeight.SemiBold
            )
            Spacer(modifier = Modifier.width(8.dp))
            Icon(
                imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                contentDescription = null,
                tint = NeonCyan,
                modifier = Modifier.size(20.dp)
            )
        }
    }
}
