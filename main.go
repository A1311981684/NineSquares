package main

import (
	_ "NineSquares/routers"
	"github.com/astaxie/beego"
	"log"
)

func main() {
	log.SetFlags(log.Lshortfile|log.Ltime)

	if beego.BConfig.RunMode == "dev" {
		beego.BConfig.WebConfig.DirectoryIndex = true
		beego.BConfig.WebConfig.StaticDir["/swagger"] = "swagger"
	}
	beego.Run()
}
