import { library } from '@fortawesome/fontawesome-svg-core';
import { faListAlt as farListAlt, faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import {
  faEye as fasEye,
  faFingerprint as fasFingerprint,
  faListAlt as fasListAlt,
  faSearch as fasSearch,
  faSortAmountDown as fasSortAmountDown,
  faSortAmountUp as fasSortAmountUp,
  faTimesCircle as fasTimesCircle,
  faUser as fasUser,
  faUserCircle as fasUserCircle,
  faUserPlus as fasUserPlus,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  fasEye,
  fasTimesCircle,
  fasUserPlus,
  fasSortAmountDown,
  fasSortAmountUp,
  fasUserCircle,
  fasFingerprint,
  fasSearch,
  fasUser,
  fasListAlt,
  farUser,
  farListAlt
);
