import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import PageContainer from "../components/PageContainer/PageContainer";

const PlannerPrivacyPolicy = () => (
    <PageContainer currPage="plannerPrivacyPolicy">
        <Container maxWidth="md" sx={{ py: 8, color: "white" }}>
            <Stack spacing={4}>
                <Box>
                    <Typography variant="h3" fontWeight={700} gutterBottom>
                        Planner Privacy Policy
                    </Typography>

                    <Typography variant="body2">
                        Effective Date: August 5, 2026
                    </Typography>
                </Box>

                <Typography>
                    Your privacy is important. This Privacy Policy explains how
                    Planner collects, uses, and protects your information when
                    you use the app.
                </Typography>

                <Divider />

                <Box>
                    <Typography variant="h5" gutterBottom>
                        Information We Access
                    </Typography>

                    <Typography paragraph>
                        Planner requests access only to the information necessary
                        to provide its features.
                    </Typography>

                    <Stack spacing={2}>
                        <Box>
                            <Typography fontWeight={600}>
                                Calendar
                            </Typography>

                            <Typography>
                                Planner accesses your calendars and events so
                                they can be displayed alongside your tasks,
                                routines, birthdays, and trips.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography fontWeight={600}>
                                Contacts
                            </Typography>

                            <Typography>
                                Planner accesses your contacts to display
                                birthdays and contact profile photos within the
                                app. Your contacts are not uploaded or shared.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography fontWeight={600}>
                                Location
                            </Typography>

                            <Typography>
                                Planner uses your location to determine your city
                                when setting your home location. You can disable
                                location access at any time in your device
                                settings.
                            </Typography>
                        </Box>
                    </Stack>
                </Box>

                <Divider />

                <Box>
                    <Typography variant="h5" gutterBottom>
                        Data Storage
                    </Typography>

                    <Typography>
                        Your planner data is stored on your device. If you
                        enable iCloud synchronization, your data may also be
                        securely synchronized using Apple's CloudKit services.
                    </Typography>
                </Box>

                <Divider />

                <Box>
                    <Typography variant="h5" gutterBottom>
                        Data Sharing
                    </Typography>

                    <Typography>
                        Planner does not sell, rent, or share your personal
                        information with third parties.
                    </Typography>
                </Box>

                <Divider />

                <Box>
                    <Typography variant="h5" gutterBottom>
                        Your Choices
                    </Typography>

                    <Typography paragraph>
                        You can revoke Calendar, Contacts, or Location
                        permissions at any time through your device's Settings
                        app. Some features may no longer function correctly if
                        these permissions are disabled.
                    </Typography>
                </Box>

                <Divider />

                <Box>
                    <Typography variant="h5" gutterBottom>
                        Children's Privacy
                    </Typography>

                    <Typography>
                        Planner is not directed toward children under the age of
                        13 and does not knowingly collect personal information
                        from children.
                    </Typography>
                </Box>

                <Divider />

                <Box>
                    <Typography variant="h5" gutterBottom>
                        Changes to This Policy
                    </Typography>

                    <Typography>
                        This Privacy Policy may be updated from time to time.
                        Changes will be reflected by updating the effective date
                        at the top of this page.
                    </Typography>
                </Box>
            </Stack>
        </Container>
    </PageContainer>
);

export default PlannerPrivacyPolicy;