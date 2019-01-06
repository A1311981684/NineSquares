package convertor

import (
	"fmt"
)

// uint16: (0000 000) [000 000 000]
// 1  0  0
// 0  0  0 = 256
// 0  0  0

// 1  1  0
// 0  0  0 = 256+128=384
// 0  0  0

// 1  0  0
// 0  1  0 = 256+16=272
// 0  0  0

//256 128 64
//32  16  8
//4   2   1

// 0000 0000 0000 0000
// 0000 0001 1111 1111
// 0000 0001 0010 1101
var checkerMap = map[int]uint16{
	11:256,
	12:128,
	13:64,
	21:32,
	22:16,
	23:8,
	31:4,
	32:2,
	33:1,
}
var nineSquaresPurifier uint16 = 511

func SetBoardBit(moverSituation, competitorSituation uint16, row, col int) (situationRes uint16, err error) {
	selfIsSet, err := checkBit(moverSituation, row, col)
	if err != nil {
		return moverSituation, err
	}
	competitorIsSet, err := checkBit(competitorSituation, row, col)
	if err != nil {
		return moverSituation, err
	}
	if selfIsSet {
		return moverSituation, fmt.Errorf("self position already used:%d, %d", row, col)
	}
	if competitorIsSet {
		return moverSituation, fmt.Errorf("competitor's position already used:%d, %d", row, col)
	}
	situationRes = moverSituation | checkerMap[row*10+col]
	return situationRes, nil
}

func checkBit(situation uint16, row, col int) (bool, error) {
	posCode := row * 10 + col
	checker, ok := checkerMap[posCode]
	if !ok {
		return false, fmt.Errorf("invalid row or col value:%d, %d", row, col)
	}
	pureSituation := situation & nineSquaresPurifier
	return (checker & pureSituation) > 0, nil
}
