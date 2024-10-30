package domains

type Song struct {
	ID           int    `gorm:"primarykey"`
	Title        string `gorm:"type:varchar(256);not null"`
	ArtistID     int    `gorm:"not null"`
	Artist       User   `gorm:"foreignKey:ArtistID"`
	FileURL      string `gorm:"type:varchar(512);not null"`
	ThumbnailURL string `gorm:"type:varchar(512);not null"`
	UploadedAt   string `gorm:"type:timestamp"`
	IsPublished  bool   `gorm:"type:bool;default:false"`
}

const SongTableName = "songs"

func (Song) TableName() string {
	return SongTableName
}
