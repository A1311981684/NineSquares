package models

var winCheckMap = map[int]uint16{
	WIN_CHECKER_COL_ONE:292,
	WIN_CHECKER_COL_TWO:146,
	WIN_CHECKER_COL_THREE:73,
	WIN_CHECKER_ROW_ONE:448,
	WIN_CHECKER_ROW_TWO:56,
	WIN_CHECKER_ROW_THREE:7,
	WIN_CHECKER_CO_RIGHT:273,
	WIN_CHECKER_CO_LEFT:84,
}

const (
	WIN_CHECKER_COL_ONE   = iota
	WIN_CHECKER_COL_TWO
	WIN_CHECKER_COL_THREE
	WIN_CHECKER_ROW_ONE
	WIN_CHECKER_ROW_TWO
	WIN_CHECKER_ROW_THREE
	WIN_CHECKER_CO_RIGHT
	WIN_CHECKER_CO_LEFT
)

func CheckWin(situation uint16) bool {
	for _, checkCode := range winCheckMap{
		if (checkCode & situation) == checkCode{
			 return true
		}
	}
	return false
}
