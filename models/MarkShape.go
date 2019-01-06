package models

type MarkShape int
func (b *MarkShape)Add(shapeId int) MarkShape {
	return MarkShape(shapeId)
}
