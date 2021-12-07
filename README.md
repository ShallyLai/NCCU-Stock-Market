# NCCU-Stock-Market（政大股市交易所）


## 一、題目說明
模擬一個封閉的股市交易系統平臺。

## 二、資料需求分析

#### １. 集團 (primary key: 集團代號 (院代號))
* 一個集團有多個公司
  > 1. 商學院3XX
  > 2. 理學院7XX
  > 3. 國務院203
  > 4. 教育學院102
  > 5. 資訊學院703
  > 6. 社科院4XX
  > 7. 傳院5XX
  > 8. 法學院601
  > 9. 文學院1XX
  > 10. 外語學院5XX
  > 11. 創新國際ZU


#### 2. 公司 (primary key: 公司編號 (系所代號))
* 一個公司只會上市一種股票
  > 大學部所有系所 EX : 資科系、資管系...

#### 3. 股票 (primary key: 股票代號)
* 一個股票有一個股價
* 一個股票會有一個股票代號

#### 4. 使用者 (primary key:使用者代號)
* 一個使用者有使用者代號、帳號密碼
* 一個使用者可以買、賣多檔股票
* 一個使用者可以擁有多檔股票
* 一個使用者可以創建多個掛單
* 一個使用者有一筆錢


#### 5. 交易 (primary key:交易編號)
 - 一筆交易會有成交股數
 - 一筆交易會有成交金額(一股金額、總額)
 - 一筆交易會有成交時間
 - 一筆交易會有一個賣方代號
 - 一筆交易會有一個買方代號
 - 一筆交易會有成交股票代號

#### 6. 掛單（primary key:掛單編號）
 - 一次掛單會有一個使用者
 - 一次掛單會有買賣之股票代號
 - 一次掛單會記錄買或賣
 - 一次掛單會記錄時間

## 三、系統功能分析

* 公司可以上市、下市
* 使用者可以掛單，掛單要賣的話就會讓股價下跌，反之則上漲
* 使用者可以查看自己有多少股票
* 使用者可以查詢目前各家公司即時股價
* 交易不會影響股價，只有掛單會影響
* 可以創建ID買賣股票


