package controllers

import (
	"NineSquares/models"
	"encoding/json"
	"github.com/astaxie/beego"
	"log"
	"strconv"
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
	var step models.Step
	err := json.Unmarshal(b.Ctx.Input.RequestBody, &step)
	if err != nil {
		b.Data["json"] = err.Error()
		b.ServeJSON()
		return
	}

	bd := models.GetBoard()
	win, err := bd.Move(step)
	if err != nil {
		b.Data["json"] = err.Error()
		b.ServeJSON()
		return
	}
	if win {
		b.Data["json"] = strconv.Itoa(step.Mover)+" "+"win!"
		b.ServeJSON()
		return
	}
	log.Println("move success: ", step)
	b.Data["json"] = "move OK"
	b.ServeJSON()
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
		b.Data["json"] = err.Error()
		b.ServeJSON()
		return
	}
	if len(players.Players) != 2 {
		b.Data["json"] = "invalid player amount"
		b.ServeJSON()
		return
	}
	models.NewBoard(players.Players[0], players.Players[1])
	log.Println("added players:", players.Players[0], players.Players[1])
	b.Data["json"] = "success"
	b.ServeJSON()
	return
}