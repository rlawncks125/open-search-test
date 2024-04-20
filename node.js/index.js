// OpenSearch 연결
const host = "localhost";
const protocol = "http";
const port = 9200;

// Create a client
const { Client } = require("@opensearch-project/opensearch");
const client = new Client({
  node: protocol + "://" + host + ":" + port,
});

const index_name = "users";

// ########## 1. Creating an index ( 인덱스 생성 )

// const settings = {
//   settings: {
//     index: {
//       number_of_shards: 2,
//       number_of_replicas: 1,
//     },
//   },
// };

const settings = {
  settings: {
    analysis: {
      filter: {
        edge_ngram_filter: {
          type: "edge_ngram",
          min_gram: 1,
          max_gram: 20,
        },
        four_ngram_filter: {
          type: "edge_ngram",
          min_gram: 4,
          max_gram: 20,
        },
      },
      analyzer: {
        autocomplete: {
          type: "custom",
          tokenizer: "standard",
          filter: ["lowercase", "edge_ngram_filter"],
        },
        my_four_analyzer: {
          type: "custom",
          tokenizer: "standard",
          filter: ["lowercase", "four_ngram_filter"],
        },
      },
    },
  },
  mappings: {
    properties: {
      user: {
        type: "text",
        analyzer: "my_four_analyzer",
        search_analyzer: "my_four_analyzer",
      },
      status: {
        type: "text",
        analyzer: "autocomplete",
        search_analyzer: "autocomplete",
      },
      Method: {
        type: "text",
      },
    },
  },
};

const response = client.indices
  .create({
    index: index_name,
    body: settings,
  })
  .then((res) => console.log(res));

console.log(response);

// ########## 1-2. Deleting an index ( 인덱스 삭제 )
// client.indices
//   .delete({
//     index: index_name,
//   })
//   .then((res) => console.log(res));

// ###################### document ###########################

// ########## 2 - 1.Indexing a document ( 문서 생성 )

// const document = {
//   title: "The Outsider",
//   author: "Stephen King",
//   year: "2018",
//   genre: "Crime fiction",
// };

// const id = "1";

// client
//   .index({
//     id: id,
//     index: index_name,
//     body: document,
//     refresh: true,
//   })
//   .then((res) => console.log(res));

// ########## 2 - 2. Searching for documents ( 문서 검색 )

// const query = {
//   query: {
//     match: {
//       title: {
//         query: "The",
//       },
//     },
//     match: {
//       year: "2018",
//     },
//   },
// };

// const query = {
//   query: {
//     multi_match: {
//       query: "Out*",
//       fields: ["title", "year", "author", "genre"],
//     },
//   },
// };

// const query = {
//   query: {
//     simple_query_string: {
//       query: "The King 2018 fiction",
//       fields: ["title", "year", "author", "genre"],
//     },
//   },
// };

// const query = {
//   query: {
//     match_all: {},
//   },
// };

// # Boolean query
// must : and 연산
// must_not : not 연산
// should : or 연산
// filter
// const query = {
//   from: 0,
//   size: 10,
//   query: {
//     bool: {
//       must: [
//         {
//           match: {
//             year: "2020",
//           },
//         },
//         {
//           match: {
//             month: "14",
//           },
//         },
//         {
//           match: {
//             day: "20",
//           },
//         },
//       ],
//     },
//   },
// };

// client
//   .search({
//     index: index_name,
//     body: query,
//   })
//   .then((res) => console.log(res.body.hits.hits));

// ########## 2 - 3. Updating a document ( 문서 업데이트 )
// 다음 코드는 지정된 id 의 document에
// genre 필드를 업데이트 하고 tv_adapted 필드를 추가하는 코드

// const id = "1";

// client
//   .update({
//     index: index_name,
//     id: id,
//     body: {
//       doc: {
//         genre: "tween fiction",
//         tv_adapted: true,
//       },
//     },
//     refresh: true,
//   })
//   .then((res) => console.log(res));

// ########## 2 - 4. Deleting a document ( 문서 삭제 )

// client
//   .delete({
//     index: index_name,
//     id: id,
//   })
//   .then((res) => console.log(res));
