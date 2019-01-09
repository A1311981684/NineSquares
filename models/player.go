package models

import (
	"errors"
	"strconv"
)

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

var playerMap = make(map[int]Player)

func AddPlayer(p Player) error {
	if _, ok := playerMap[p.Id]; ok {
		return errors.New("player already exists")
	}else {
		playerMap[p.Id] = p
		return nil
	}
}

func UpdatePlayer(player Player) error {
	if _, ok := playerMap[player.Id]; !ok {
		return errors.New("player not exists: id = " + strconv.Itoa(player.Id))
	}else {
		playerMap[player.Id] = player
		return 	nil
	}
}

func DeletePlayer(id int) error {
	if _, ok := playerMap[id]; !ok {
		return errors.New("player not exists: id = " + strconv.Itoa(id))
	}else {
		delete(playerMap, id)
		return nil
	}
}

func GetPlayer(id int) (Player, error){
	if _, ok := playerMap[id]; !ok {
		return Player{}, errors.New("player not exists: id = " + strconv.Itoa(id))
	}else {
		return 	playerMap[id], nil
	}
}