package domains

type Playlist struct {
	ID          int    `gorm:"primarykey"`
	Name        string `gorm:"type:varchar(256);not null"`
	UserID      int    `gorm:"not null"`
	User        User   `gorm:"foreignKey:UserID"`
	Description string `gorm:"type:varchar(512)"`
	Songs       []Song `gorm:"many2many:playlist_songs;"`
	CreatedAt   string `gorm:"type:timestamp"`
}

const PlaylistTableName = "playlists"

func (Playlist) TableName() string {
	return PlaylistTableName
} 