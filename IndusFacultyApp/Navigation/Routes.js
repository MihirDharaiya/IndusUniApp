import LoginScreen from "../screens/authScreens/LoginScreen";
import ForgotPassword from "../screens/authScreens/ForgotPassword";
import Analytics from "../screens/Analytics";
import Announcement from "../screens/Announcement";
import HomeScreen from "../screens/HomeScreen";
import Notification from "../screens/Notification";
import Profile from "../screens/Profile";
import TotalDoubts from "../screens/TotalDoubts";
import TotalAnnouncements from "../screens/TotalAnnouncements";
import AnswerDoubt from "../screens/AnswerDoubt";
import Splash from "../screens/authScreens/Splash";
import VerifyEmail from "../screens/authScreens/VerifyEmail";
import ResetPasswordLinkSend from "../screens/authScreens/ResetPasswordLinkSend";
import OnLeave from "../screens/OnLeave";
import ReportStudent from "../screens/ReportStudent";
import ViewDetails from "../screens/ViewDetails";
const Routes = {
  loginScreen: LoginScreen,
  forgotPassword: ForgotPassword,
  home: HomeScreen,
  analytics: Analytics,
  announcement: Announcement,
  notification: Notification,
  profile: Profile,
  totalDoubts: TotalDoubts,
  totalAnnouncements: TotalAnnouncements,
  answerDoubt: AnswerDoubt,
  splash: Splash,
  verifyEmail: VerifyEmail,
  onLeave: OnLeave,
  resetPasswordLinkSend: ResetPasswordLinkSend,
  reportStudent: ReportStudent,
  viewDetails: ViewDetails,
};
export default Routes;
