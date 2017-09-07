# Change Log
NOWnewsAdmin 的所有改變將在此 CHANGELOG 文件中記錄。

格式基於 [Keep a Changelog](http://keepachangelog.com/zh-TW/0.3.0/)
而項目則基於 [Semantic Versioning](http://semver.org/lang/zh-TW/).

## [Unreleased]
### Added
- 增加廠商專屬的列表「我的新聞(廠商)」 @esbb48
- 增加專欄管理（特輯版型） @esbb48
- 增加版型提醒在選單排序頁 @esbb48

### Changed
- 所有新聞列表和編輯新聞使用者改成由staffId排序 @appleoxxo
- 取得使用者列表時 加上 isInitUser 藉此篩選出匯入新聞 @appleoxxo
- 所有新聞列表 預設只顯示非匯入新聞 @appleoxxo
- 圖片列表 在關鍵字輸入框按下Enter就啟動搜尋 @appleoxxo
- 新增新聞時預設作者改為空白 而不是許家禎 @appleoxxo
- 審稿時可直接編輯主圖圖說 @appleoxxo
- 新增版主班表管理(目前隱藏) @wb

## 1.0.11 - 2017-08-31
### Changed
- 頭版控版頁，預設顯示的新聞照發佈時間排序。@wb
- 首頁大五小五設定，預設顯示拉到40筆(api抓60筆，但要扣除被選的20筆) @wb
- 首頁影片設定，預設顯示拉到10筆(api抓30筆，但要扣除被選的20筆) @wb
- 恢復之前註解的中央社圖片搜尋UI @appleoxxo
- 調整每日稿單內容顯示方式 @appleoxxo
- 內文的縮圖加上縮圖 api @wb
- 刪除新聞資料的時候，必須帶入 `UpdatedBy` 欄位 @SimonSun

## 1.0.10 - 2017-08-24
###Fixed
- 修正首頁控版的時間格式 @wb

## 1.0.10 - 2017-08-24
### Changed
- 修復上傳過大mp4檔案會失敗的問題 @appleoxxo
- 修復facebook嵌入影片問題 @appleoxxo
- 頭版控版頁，可否點擊文稿標題即可閱讀該文。 @wb
- 頭版控版頁，可否在文稿標題右端出現發稿時間、PV數。 @wb
- 頭版控版頁，勿出現預發稿與業配稿標題。 @wb
- 頭版控版頁[加到 40 筆]，顯示數量目前是20個 @wb
- 頭版控版頁，可以直接點選後編輯 @wb
- 發稿發生地，可否在個人資料中即有預設功能。 @wb
- 撰寫圖說時，希望能保留預設三角形符號。 @wb

## 1.0.9 - 2017-08-14
### Changed
-  新增ott後台 操作使用@wayne1025

## 1.0.9 - 2017-08-15
### Added
-  新聞列表加上Facebook統計數字顯示 @appleoxxo

## 1.0.8 - 2017-08-09
### Changed
-  移除業配使用的自由欄位style限制 @appleoxxo

## 1.0.7 - 2017-08-03
### Added
-  統計增加ＰＶ平均數和總計 @appleoxxo

## 1.0.6 - 2017-07-11
### Changed
-  更新 staging 設定黨 @esbb48

## 1.0.6 - 2017-07-11
### Fixed
-  修正上傳太寬或太長的圖時預覽圖無法顯示 @appleoxxo

## 1.0.5 - 2017-07-07
### Added
-  圖片新聞新增'加入全部已上傳圖片'按鈕 @appleoxxo
### Changed
-  暫時註解中央社圖片選項UI @appleoxxo
-  限制前端選擇圖片和影片的檔案類型 @appleoxxo

## 1.0.5 - 2017-07-07
### Added
-  增加 CheckAuth @esbb48
### Changed
-  調整 Preview 參數 @esbb48
-  調整列表查詢寬度 @esbb48

## 1.0.4 - 2017-07-06
### Added
-  CKeditor加上符號選擇器 @appleoxxo
-  CKeditor開啟預設ACF過濾 @appleoxxo

## 1.0.3 - 2017-07-05
### Bug
-  修正編輯器無法複製圖片問題 @wb @appleoxxo

## 1.0.2 - 2017-07-04
### Add
-  新聞內容若有MLB的ifrme http連結改成https @appleoxxo

## 1.0.1 - 2017-07-03
### Changed
-  新聞列表加上PV欄位 @appleoxxo

## 1.0.0 - 2017-06-28
### Changed
-  正式上線 @appleoxxo

## 0.0.1 - 2016-11-08
### Added
