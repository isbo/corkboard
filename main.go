package main

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

type clip struct {
	ID        string    `json:"id"`
	Content   string    `json:"content"`
	SourceIP  string    `json:"source_ip"`
	CreatedAt time.Time `json:"created_at" time_format:"RFC3339"`
}

var clips = make(map[string]clip)

func postClip(c *gin.Context) {
	content := c.PostForm("content")
	if content == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "missing content"})
		return
	}
	id := strconv.Itoa(len(clips))
	newClip := clip{
		ID:        id,
		Content:   content,
		SourceIP:  c.ClientIP(),
		CreatedAt: time.Now(),
	}
	clips[id] = newClip

	c.IndentedJSON(http.StatusCreated, newClip)
}

func deleteClip(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "missing ID"})
		return
	}

	if _, ok := clips[id]; ok {
		delete(clips, id)
	} else {
		c.JSON(http.StatusNotFound, gin.H{"error": "clip not found"})
	}
}

func getClips(c *gin.Context) {
	vals := make([]clip, 0, len(clips))
	for _, v := range clips {
		vals = append(vals, v)
	}
	c.IndentedJSON(http.StatusOK, vals)
}

func getClipById(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "missing ID"})
		return
	}

	if val, ok := clips[id]; ok {
		c.IndentedJSON(http.StatusOK, val)
	} else {
		c.JSON(http.StatusNotFound, gin.H{"error": "clip not found"})
	}
}

func main() {
	router := gin.Default()
	router.GET("/clips", getClips)
	router.GET("/clips/:id", getClipById)
	router.POST("/clips", postClip)
	router.DELETE("/clips/:id", deleteClip)
	router.Use(static.Serve("/", static.LocalFile("webapp/build/", false)))
	router.Run("localhost:6119")
}
