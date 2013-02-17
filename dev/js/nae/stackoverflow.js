define(['jquery'],
  function ($) {
    var api, $stackOverflow, fetchAnswers, fetchQuestions, placeAnswers;

    api = 'http://api.stackexchange.com/2.1/';

    $stackOverflow = $('<section>', {
      'class': 'stack-overflow',
      html: '<h2><a href="http://stackoverflow.com/users/399077/nate?tab=answers">Stack Overflow</a></h2><p>Sometimes I try to answer questions on <a href="http://stackoverflow.com">Stack&nbsp;Overflow</a>.</p>'
    });
    // /2.1/users/399077/answers?page=1&pagesize=5&order=desc&sort=creation&site=stackoverflow

    if (!$('#stack-overflow').length) {
      return;
    }

    fetchAnswers = function () {
      return $.ajax({
        dataType: 'jsonp',
        data: {
          page: 1,
          pagesize: 5,
          order: 'desc',
          sort: 'creation',
          site: 'stackoverflow'
        },
        url: api + '/users/399077/answers'
      });
    };

    fetchQuestions = function (answerIds) {
      if (!answerIds) {
        return;
      }

      answerIds = answerIds.join(';');

      return $.ajax({
        dataType: 'jsonp',
        data: {
          order: 'desc',
          sort: 'creation',
          site: 'stackoverflow'
        },
        url: api + 'questions/' + answerIds
      });
    };

    placeAnswers = function (answers, questions) {
      //console.log(answers, questions);
      var $answers;

      $answers = $('<ul>');

      $.each(answers, function (i, answer) {
        var answerHtml, $answer, question;

        question = questions.filter(function (question) {
          return question.question_id === answer.question_id;
        });

        // Get the first value, since filter returns an array
        question = question[0];

        answerHtml = [
          '<a href="http://stackoverflow.com/a/',
          answer.answer_id,
          '">&ldquo;',
          question.title,
          '&rdquo;</a>'
        ];
        //console.log(answerHtml.join(''));

        answerHtml = answerHtml.join('');

        $answer = $('<li>', {
          html: answerHtml
        }).appendTo($answers);
      });

      $answers.appendTo($stackOverflow);
      $stackOverflow.appendTo('#stack-overflow');
    };

    $.when(fetchAnswers()).done(function (data) {
      var answers, questions, questionIds;

      answers = data.items;

      questionIds = [];
      $.each(answers, function (i, answer) {
        questionIds.push(answer.question_id);
      });

      //console.log('data', data);

      $.when(fetchQuestions(questionIds)).done(function (data) {
        //console.log('question data', data);
        questions = data.items;

        placeAnswers(answers, questions);
      });
    });

  }
);
