package controllers

import (
	"NineSquares/GameStatus"
	"NineSquares/models"
	"encoding/json"
	"github.com/astaxie/beego"
	"log"
	"strconv"
	"wzjTools/beegoServe"
)

type BoardController struct {
	beego.Controller
}

//@Title move a step
//@Description move a step. Who and where
//@Param step body models.Step true "the next step to move"
//@Success 200 move success
//@Failure 500 move failed
//@router /move [post]
func (b *BoardController)Move(){

	bd := models.GetBoard()
	if 	bd.GameStatus == GameStatus.Finished{
		beegoServe.BeegoServeJson(&b.Controller, "game over:"+models.GetBoard().Winner.Name+" win!", 200)
		return
	}

	var step models.Step
	err := json.Unmarshal(b.Ctx.Input.RequestBody, &step)
	if err != nil {
		log.Println(err.Error())
		beegoServe.BeegoServeJson(&b.Controller, "move failed:" + err.Error(), 500)
		return
	}

	win, err := bd.Move(step)
	if err != nil {
		log.Println(err.Error())
		beegoServe.BeegoServeJson(&b.Controller, "move failed:"+err.Error(), 500)
		return
	}
	if win {
		p, err := models.GetPlayer(step.Mover)
		if err != nil {
			log.Println(err.Error())
			beegoServe.BeegoServeJson(&b.Controller, "assert failed"+err.Error(), 500)
			return
		}
		bd.GameStatus = GameStatus.Finished
		beegoServe.BeegoServeJson(&b.Controller, strconv.Itoa(p.Id)+":"+p.Name+" "+"win!", 200)
		return
	}
	if models.GetBoard().GameStatus == GameStatus.Finished {
		beegoServe.BeegoServeJson(&b.Controller, "game over, everybody is winner!", 200)
		return
	}
	beegoServe.BeegoServeJson(&b.Controller, "move success", 200)
	return
}

//@Title New board
//@Description start a new game board
//@Param players body models.GamePlayer true "player one and player two"
//@Success 200 operation success
//@Failure 500 operation failed
//@router /board [put]
func (b *BoardController)NewBoard(){
	var players models.GamePlayer
	err := json.Unmarshal(b.Ctx.Input.RequestBody, &players)
	if err != nil {
		log.Println(err.Error())
		beegoServe.BeegoServeJson(&b.Controller, "start game failed:"+err.Error(), 500)
		return
	}
	if len(players.Players) != 2 {
		log.Println(err.Error())
		beegoServe.BeegoServeJson(&b.Controller, "invalid player amount:", 500)
		return
	}
	err = models.AddPlayer(players.Players[0])
	if err != nil {
		log.Println(err.Error())
		beegoServe.BeegoServeJson(&b.Controller, "start game failed:"+err.Error(), 500)
		return
	}
	err = models.AddPlayer(players.Players[1])
	if err != nil {
		log.Println(err.Error())
		beegoServe.BeegoServeJson(&b.Controller, "start game failed:"+err.Error(), 500)
		return
	}
	models.NewBoard(players.Players[0], players.Players[1])
	log.Println("added players:", players.Players[0], players.Players[1])
	beegoServe.BeegoServeJson(&b.Controller, "start game success", 200)
	return
}