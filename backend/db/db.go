package db

import (
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"api/models/domains"

	gormlog "gorm.io/gorm/logger"
)

type DB struct {
	*gorm.DB
}

var dbInstance *DB

func ConnectDB() error {
	gormCfg := &gorm.Config{
		DisableNestedTransaction: true,
		SkipDefaultTransaction:   true,
		Logger: gormlog.New(
			log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer
			gormlog.Config{
				SlowThreshold:             time.Second,  // Slow SQL threshold
				LogLevel:                  gormlog.Info, // Log level
				IgnoreRecordNotFoundError: true,         // Ignore ErrRecordNotFound error for logger
				Colorful:                  true,         // Disable color
			}),
	}

	// Use PostgreSQL connection instead of SQLite
	// dsn := "host=host.docker.internal user=postgres password=postgres dbname=postgres port=5432 sslmode=disable TimeZone=Europe/Athens"
	dsn := "host=localhost user=postgres password=postgres dbname=postgres port=5432 sslmode=disable TimeZone=Europe/Athens"
	conn, err := gorm.Open(postgres.Open(dsn), gormCfg)
	if err != nil {
		return fmt.Errorf("failed to connect to PostgreSQL: %w", err)
	}
	dbInstance = &DB{conn}
	return nil
}

// Migration : auto migrate data models
func (db *DB) Migration() {
	db.AutoMigrate(
		&domains.User{},
		&domains.Song{},
		&domains.Playlist{},
		&domains.Favorite{},
	)
}

func GetInstance() *DB {
	return dbInstance
}
