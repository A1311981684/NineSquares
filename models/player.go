package models

type Player struct {
	Name string
	Id int
	Wins int
	Lose int
	WinRate float64
	Mark MarkShape
	PrivateSituation uint16
}

type GamePlayer struct {
	Players []Player
}
