package domains

type Favorite struct {
	ID     int  `gorm:"primarykey"`
	UserID int  `gorm:"not null"`
	User   User `gorm:"foreignKey:UserID"`
	SongID int  `gorm:"not null"`
	Song   Song `gorm:"foreignKey:SongID"`
}

const FavoriteTableName = "favorites"

func (Favorite) TableName() string {
	return FavoriteTableName
} 