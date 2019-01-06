package models

type Step struct {
	Mover int
	Pos   Position
}

type Position struct {
	Row int
	Col int
}
