import i18n, { Translations } from "./i18n";
import Button from "./Components/Button";
import AbstractModal from "./Components/Modal/AbstractModal";
import ConfirmAlertModal from "./Components/Modal/ConfirmAlertModal";
import RobotLogModal from "./Components/Modal/RobotLogModal";
import Drawer from "./Components/Drawer";
import Collapse from "./Components/Collapse";
import VerticalBar from "./Components/VerticalBar/VerticalBar";
import ContextMenu from "./Components/ContextMenu";
import Table from "./Components/Table";
import Tabs from "./Components/Tabs";
import Text from "./Components/Text";
import Toggle from "./Components/Toggle";
import SearchInput from "./Components/SearchInput";
import Breadcrumb from "./Components/Breadcrumb";
import Select from "./Components/Select";
import { snackbar } from "./Components/Snackbar/Snackbar";
import Themes from "./styles/Themes";
import Style from "./styles/Style";
import Logs from "./Components/Logs/Logs";
import LoginForm from "./Components/LoginForm/LoginForm";
import NotAuthorized from "./Components/LoginForm/LoginPanel";
import ProfileMenu from "./Components/ProfileMenu/ProfileMenu";
import ResetPasswordModal from "./Components/ProfileMenu/ResetPassword";
import TimeFilters from "./Components/Logs/LogsFilterBar/sub-components/TimeFilters";
import FilterIcon from "./Components/Logs/LogsFilterBar/sub-components/_shared/FiltersIcon/FiltersIcon";
import SelectScopeModal, { getAllData } from "./Components/Modal/SelectScopeModal";
import HTMLPopper from "./Components/Popper/HTMLPopper";
import HomeMenuPopper from "./Components/HomeMenu/HomeMenu";
import HomeMenuSkeleton from "./Components/HomeMenu/HomeMenuSkeleton";
import ErrorBoundary from "./Components/ErrorBoundary";
// import HOCs
import withOfflineValidation from "./Components/HOCs/withOfflineValidation";
import withAuthentication, { authSub } from "./Components/HOCs/withAuthentication";
import withNotification from "./Components/HOCs/withNotification";
import withTheme, { themeSub } from "./Components/HOCs/withTheme";
import withDefaults from "./Components/HOCs/withDefaults";
import withError from "./Components/HOCs/withError";
// import Translations
export * from "./Utils/Sub";
import useSub, { withSub } from "./hooks/useSub";
import ExportPdf from "./exporters/pdf";
import ExportCsv from "./exporters/csv";
export {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Autocomplete,
  Avatar,
  Backdrop,
  Badge,
  Box,
  Button as BaseButton,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  CircularProgress,
  ClickAwayListener,
  Collapse as BaseCollapse,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer as BaseDrawer,
  Fab,
  Fade,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputBase,
  InputLabel,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  NativeSelect,
  Paper,
  ParameterLine,
  Popper,
  Select as BaseSelect,
  Skeleton,
  SnackbarContent,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  SvgIcon,
  Switch,
  Table as BaseTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
export {
  amber,
  green,
} from "@mui/material/colors";
export {
  alpha,
} from "@mui/material/styles";
export {
  AcUnit as AcUnitIcon,
  AccessAlarm as AccessAlarmIcon,
  Accessibility as AccessibilityIcon,
  AccountBalance as AccountBalanceIcon,
  AccountTree as AccountTreeIcon,
  Adb as AdbIcon,
  Add as AddIcon,
  AddBox as AddBoxIcon,
  AddIc as AddIcCallIcon,
  AirplanemodeActive as AirplanemodeActiveIcon,
  Apps as AppsIcon,
  ArrowDownward as ArrowDownwardIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ArrowRight as ArrowRightIcon,
  ArrowRightAlt as ArrowRightAltIcon,
  ArrowUpward as ArrowUpwardIcon,
  AssignmentInd as AssignmentIndIcon,
  Bookmark as BookmarkIcon,
  BugReport as BugReportIcon,
  Build as BuildIcon,
  CallMade as CallMadeIcon,
  Check as CheckIcon,
  ChevronRight as ChevronRightIcon,
  ChromeReaderMode as ChromeReaderModeIcon,
  Clear as ClearIcon,
  Close as CloseIcon,
  CloudDownload as CloudDownloadIcon,
  Code as CodeIcon,
  Comment as CommentIcon,
  Compare as CompareIcon,
  CompareArrows as CompareArrowsIcon,
  Delete as DeleteIcon,
  DeleteOutline as DeleteOutlineIcon,
  Description as DescriptionIcon,
  DeviceHub as DeviceHubIcon,
  Download as DownloadIcon,
  DragIndicator as DragIndicatorIcon,
  Edit as EditIcon,
  Error as ErrorIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  FileCopy as FileCopyIcon,
  FileCopyOutlined as FileCopyOutlinedIcon,
  FolderOpen as FolderOpenIcon,
  Grade as GradeIcon,
  Grain as GrainIcon,
  Home as HomeIcon,
  Image as ImageIcon,
  Info as InfoIcon,
  Input as InputIcon,
  Keyboard as KeyboardIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  ListAlt as ListAltIcon,
  Link as LinkIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
  Logs as LogsIcon,
  MoreHoriz as MoreHorizIcon,
  MoreVert as MoreVertIcon,
  NoteAdd as NoteAddIcon,
  OpenInNew as OpenInNewIcon,
  PauseCircleOutline as PauseCircleOutlineIcon,
  PermMedia as PermMediaIcon,
  PlayArrow as PlayArrowIcon,
  PlayCircleOutline as PlayCircleOutlineIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
  Stop as StopIcon,
  SwapHoriz as SwapHorizIcon,
  ToggleOn as ToggleOnIcon,
  Tune as TuneIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Warning as WarningIcon,
  Web as WebIcon,
  Wifi as WifiIcon,
  WifiOff as WifiOffIcon,
} from "@mui/icons-material";
export {
  makeStyles,
  withStyles,
  useTheme,
  ThemeProvider,
} from "@mui/styles";
export {
  TreeView,
  TreeItem,
} from "@mui/x-tree-view";
export {
  default as MaterialTable,
  MTableCell,
  MTableToolbar,
  MTableEditRow,
} from "@material-table/core";
export { DropzoneArea } from "react-mui-dropzone";

export {
  withOfflineValidation,
  withAuthentication,
  withNotification,
  withTheme,
  authSub,
  themeSub,
  useSub,
  withSub,
  withDefaults,
  withError,
  Button,
  AbstractModal,
  ConfirmAlertModal,
  SelectScopeModal,
  getAllData,
  RobotLogModal,
  Drawer,
  Collapse,
  VerticalBar,
  ContextMenu,
  Table,
  Tabs,
  Text,
  Themes,
  Toggle,
  SearchInput,
  Breadcrumb,
  Select,
  snackbar,
  Style,
  Logs,
  TimeFilters,
  FilterIcon,
  LoginForm,
  ProfileMenu,
  ResetPasswordModal,
  HTMLPopper,
  HomeMenuPopper,
  HomeMenuSkeleton,
  ErrorBoundary,
  Translations,
  i18n,
  NotAuthorized,
  ExportPdf,
  ExportCsv,
};
