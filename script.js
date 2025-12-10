document.addEventListener('DOMContentLoaded', () => {
    const quizListContainer = document.getElementById('quiz-list');
    const searchInput = document.getElementById('searchInput');

    async function loadQuizzes() {
        try {
            // Fetch JSON
            const response = await fetch('./quizzes.json');
            if (!response.ok) {
                throw new Error("Không tìm thấy file quizzes.json");
            }

            const quizzes = await response.json();
            displayQuizzes(quizzes);

        } catch (error) {
            console.error("Không thể tải danh sách bài trắc nghiệm:", error);
            quizListContainer.innerHTML = 
                '<p class="loading-message">Không thể tải danh sách bài. Hãy kiểm tra lại file quizzes.json hoặc chạy bằng Live Server.</p>';
        }
    }

    function displayQuizzes(quizzes) {
        quizListContainer.innerHTML = '';

        if (!Array.isArray(quizzes)) {
            quizListContainer.innerHTML = '<p class="loading-message">File quizzes.json không đúng định dạng.</p>';
            return;
        }

        if (quizzes.length === 0) {
            quizListContainer.innerHTML = '<p class="loading-message">Không có bài nào.</p>';
            return;
        }

        quizzes.forEach(quiz => {
            const card = document.createElement('a');
            card.href = quiz.file;
            card.className = 'quiz-card';

            card.innerHTML = `
                <div>
                    <i class="fas ${quiz.icon || 'fa-file-alt'} card-icon"></i>
                    <h3>${quiz.title}</h3>
                    <p>${quiz.description || 'Nhấn để làm bài.'}</p>
                </div>
            `;

            quizListContainer.appendChild(card);
        });
    }

    function filterQuizzes() {
        const searchTerm = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll('.quiz-card');

        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            card.style.display = 
                (title.includes(searchTerm) || description.includes(searchTerm))
                ? 'flex'
                : 'none';
        });
    }

    searchInput.addEventListener('input', filterQuizzes);

    loadQuizzes();
});
