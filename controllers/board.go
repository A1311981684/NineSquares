package controllers

import (
	"NineSquares/GameStatus"
	"NineSquares/models"
	"NineSquares/util"
	"encoding/json"
	"github.com/astaxie/beego"
	"log"
	"strconv"
	serve "wzjTools/beegoServeJson"
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
		serve.BeegoServeJson(&b.Controller, util.RESULT_FINISHED, "game already over:"+models.GetBoard().Winner.Name+" win!")
		return
	}

	var step models.Step
	err := json.Unmarshal(b.Ctx.Input.RequestBody, &step)
	if err != nil {
		log.Println(err.Error())
		serve.BeegoServeJson(&b.Controller, util.RESULT_FAILED, "move failed:" + err.Error())
		return
	}

	win, err := bd.Move(step)
	if err != nil {
		log.Println(err.Error())
		serve.BeegoServeJson(&b.Controller, util.RESULT_FAILED, "move failed:"+err.Error())
		return
	}
	if win {
		p, err := models.GetPlayer(step.Mover)
		if err != nil {
			log.Println(err.Error())
			serve.BeegoServeJson(&b.Controller, util.RESULT_FAILED, "assert failed"+err.Error())
			return
		}
		bd.GameStatus = GameStatus.Finished
		serve.BeegoServeJson(&b.Controller,util.RESULT_FINISHED, strconv.Itoa(p.Id)+":"+p.Name+" "+"win!")
		return
	}
	if models.GetBoard().GameStatus == GameStatus.Finished {
		serve.BeegoServeJson(&b.Controller, util.RESULT_FINISHED, "game over, everybody is winner!")
		return
	}
	serve.BeegoServeJson(&b.Controller,util.RESULT_SUCCESS, "move success")
	return
}

//@Title New board
//@Description start a new game board
//@Param players body models.GamePlayer true "player one and player two"
//@Success 200 operation success
//@Failure 500 operation failed
//@router /newGame [put]
func (b *BoardController)NewBoard(){
	var players models.GamePlayer
	err := json.Unmarshal(b.Ctx.Input.RequestBody, &players)
	if err != nil {
		log.Println(err.Error())
		serve.BeegoServeJson(&b.Controller,util.RESULT_FAILED, "start game failed:"+err.Error())
		return
	}
	if len(players.Players) != 2 {
		log.Println(err.Error())
		serve.BeegoServeJson(&b.Controller,util.RESULT_FAILED, "invalid player amount:")
		return
	}
	err = models.AddPlayer(players.Players[0])
	if err != nil {
		log.Println(err.Error())
		serve.BeegoServeJson(&b.Controller,util.RESULT_FAILED, "start game failed:"+err.Error())
		return
	}
	err = models.AddPlayer(players.Players[1])
	if err != nil {
		log.Println(err.Error())
		serve.BeegoServeJson(&b.Controller,util.RESULT_FAILED, "start game failed:"+err.Error())
		return
	}
	models.NewBoard(players.Players[0], players.Players[1])
	log.Println("added players:", players.Players[0], players.Players[1])
	serve.BeegoServeJson(&b.Controller,util.RESULT_SUCCESS, "start game success")
	return
}

func (b *BoardController) Views(){
	b.TplName = "main.html"
}