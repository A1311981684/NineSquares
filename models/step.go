package models

type Step struct {
	Mover int
	Pos   Position
}

type Position struct {
	ARow int
	BCol int
}
