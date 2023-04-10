package main

import (
	"fmt"
	"github.com/sirupsen/logrus"
	"os"
	"path"
	"runtime"
	"strconv"
)

func setLogger() {
	log.SetLevel(logrus.Level(LogLevel))

	if PlainStorage {
		// ignore the error if /logs already exists
		_ = os.Mkdir("./logs", os.ModePerm)

		e := os.RemoveAll(fmt.Sprintf("./logs/s%d", ServerID))
		if e != nil {
			log.Fatal(e)
		}

		if Role == 0 || Role == 1{
			log.Infof(">> old logs removed at " + fmt.Sprintf("./logs/s%d", ServerID))
		}

		if err := os.Mkdir(fmt.Sprintf("./logs/s%d", ServerID), os.ModePerm); err != nil {
			log.Error(err)
		}
		
		if Role == 0 || Role == 1{
			log.Infof(">> new log folder created at " + fmt.Sprintf("./logs/s%d", ServerID))
		}

		log.Formatter = &logrus.TextFormatter{
			ForceColors:               false,
			DisableColors:             true,
			ForceQuote:                false,
			EnvironmentOverrideColors: false,
			DisableTimestamp:          true,
			FullTimestamp:             false,
			TimestampFormat:           "",
			DisableSorting:            false,
			SortingFunc:               nil,
			DisableLevelTruncation:    false,
			PadLevelText:              false,
			QuoteEmptyFields:          false,
			FieldMap:                  nil,
			CallerPrettyfier:          nil,
		}

		log.Out = os.Stdout
		fileName := fmt.Sprintf("./logs/s%d/n_%d_b%d_d%d.log", ServerID, NumOfConn, BatchSize, Delay)
		file, err := os.OpenFile(fileName, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
		if err != nil {
			log.Info("Failed to log to file, using default stderr")
		}
		log.Out = file
		return
	}

	log.SetReportCaller(true)
	log.SetFormatter(&logrus.TextFormatter{
		CallerPrettyfier: func(frame *runtime.Frame) (function string, file string) {
			fileName := path.Base(frame.File) + ":" + strconv.Itoa(frame.Line) + ""
			//return frame.Function, fileName
			return "", fileName + " >>"
		},
	})
}
