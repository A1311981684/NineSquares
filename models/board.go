package models

import (
	"NineSquares/GameStatus"
	"NineSquares/convertor"
	"fmt"
	"log"
)
var board *Board
type Board struct {
	PlayerA      *Player
	PlayerB      *Player
	Winner *Player
	GameProgress int
	GameStatus   GameStatus.Status
	Situation    uint16
}

func NewBoard(p1, p2 Player) {
	board = &Board{PlayerA: &p1, PlayerB: &p2, GameProgress: 0, GameStatus: GameStatus.Unstarted}
}

func (b *Board)Move(step Step)(bool, error){
	var mover, competitor *Player
	if step.Mover == GetBoard().PlayerA.Id {
		mover = GetBoard().PlayerA
		competitor = GetBoard().PlayerB
	}else if step.Mover == GetBoard().PlayerB.Id{
		mover = GetBoard().PlayerB
		competitor = GetBoard().PlayerA
	}else {
		return false, fmt.Errorf("player id not exist: %d", step.Mover)
	}
	log.Println("mover is:", mover)
	situationRes, err := convertor.SetBoardBit(mover.PrivateSituation, competitor.PrivateSituation, step.Pos.Row, step.Pos.Col)
	if err != nil {
		return false, err
	}
	GetBoard().GameProgress += 1
	if GetBoard().GameProgress == 9 {
		GetBoard().GameStatus = GameStatus.Finished
	}
	mover.PrivateSituation = situationRes
	if CheckWin(mover.PrivateSituation) {
		GetBoard().Winner = mover
		return true, nil
	}
	return false,  nil
}

func GetBoard() *Board{
	if board != nil {
		return board
	}
	panic("null board")
}
