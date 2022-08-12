本目录用于存储爬虫获取的数据

#### postgres
为了方便后续的系统开发，爬虫获取的新数据已经部署到`k8s`集群上的`postgres`数据库中
```json
{
    "dbname":"crawler",
    "ip":"10.105.222.6",
    "port":41466,
    "username":"acdev",
    "password":"qU9rgx!31^2n"
}
```
在命令行中，可用如下方式连接数据库：
```shell
psql postgresql://acdev:qU9rgx!31^2n@10.105.222.6:41466/crawler
```

#### csranking.json
来自 [csranking](https://csrankings.org/) 的数据，使用的选项如下：
|  key  | value  |
|  ----  | ----  |
| All area  | on |
| Rank institutions in  | the world |
| from | 2012 |
| to | 2022|

文件整体是以描述每所大学的数据结构组成的列表。下面以一所大学为例，解释描述一所大学的数据结构：
```json
{
    "id": 567,
    "name": "Western Michigan University",
    "country": "us",
    "count": "1.0",
    "faculty": "1",
    "subtable": [
        {
            "name": "Seung-Hee Bae",
            "home": "https://wmich.edu/cs/directory/bae",
            "area": "",
            "google_scholar": "https://scholar.google.com/citations?user=PsOs9jAAAAAJ&hl=en&oi=ao",
            "dblp": "https://dblp.org/pers/hd/b/Bae:Seung%3DHee",
            "pubs": "1",
            "adj": "0.5"
        }
    ]
}
```

|字段|类型|含义|
|---|---|---|
|`id`|number|大学的标识符，也代表了排名|
|`name`|string|大学的名称|
|`country`|string|大学所在的国家的英文缩写|
|`count`|string|该大学有记录的科研人员的平均引用量|
|`faculty`|string|该大学当前人员数量|
|`subtable`|array|描述该大学研究人员的子表|
`subtable`数组中的每个元素都描述了一位该大学的科研人员，其结构为：

|字段|类型|含义|
|---|---|---|
|`name`|string|研究人员的姓名|
|`home`|string|主页URL|
|`area`|string|研究领域，多个研究领域以逗号分隔|
|`google_scholar`|string|谷歌学术z主页URL|
|`dblp`|string|DBLP term URL|
|`pubs`|string|出版物数量|
|`adj`|string|出版物数量/共同作者数|

在`crawler`数据库中，csranking数据源对应的表都以`csranking_`开头。
```
                关联列表
架构模式 |       名称        |  类型  | 拥有者
----------+-------------------+--------+--------
public   | csranking_faculty | 数据表 | zzh
public   | csranking_univ    | 数据表 | zzh
```

#### google scholar
在`crawler`数据库中，google scholar数据源对应的表都以`gs_`开头。
```
public   | gs_area           | 数据表 | zzh
public   | gs_area_scholar   | 数据表 | zzh
public   | gs_coauthor       | 数据表 | zzh
public   | gs_paper          | 数据表 | zzh
public   | gs_scholar        | 数据表 | zzh
public   | gs_scholar_paper  | 数据表 | zzh
```