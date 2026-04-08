// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      hamburger.setAttribute('aria-expanded',
        navLinks.classList.contains('active') ? 'true' : 'false'
      );
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Countdown timer
  var countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    var targetDate = new Date('2026-11-19T09:00:00+11:00').getTime();

    function updateCountdown() {
      var now = new Date().getTime();
      var diff = targetDate - now;

      if (diff <= 0) {
        countdownEl.innerHTML = '<p>The conference has begun!</p>';
        return;
      }

      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((diff % (1000 * 60)) / 1000);

      countdownEl.innerHTML =
        '<div class="countdown-item"><span class="number">' + days + '</span><span class="label">Days</span></div>' +
        '<div class="countdown-item"><span class="number">' + hours + '</span><span class="label">Hours</span></div>' +
        '<div class="countdown-item"><span class="number">' + minutes + '</span><span class="label">Minutes</span></div>' +
        '<div class="countdown-item"><span class="number">' + seconds + '</span><span class="label">Seconds</span></div>';
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // Committee table search & sort
  var searchBox = document.getElementById('committeeSearch');
  if (searchBox) {
    var table = document.getElementById('committeeTable');
    var rows = table.querySelectorAll('tbody tr');
    var countEl = document.getElementById('memberCount');

    searchBox.addEventListener('input', function () {
      var query = this.value.toLowerCase();
      var visible = 0;

      rows.forEach(function (row) {
        var text = row.textContent.toLowerCase();
        if (text.indexOf(query) !== -1) {
          row.classList.remove('hidden');
          visible++;
        } else {
          row.classList.add('hidden');
        }
      });

      if (countEl) {
        countEl.textContent = 'Showing ' + visible + ' of ' + rows.length + ' members';
      }
    });

    // Column sorting
    var headers = table.querySelectorAll('th[data-sort]');
    headers.forEach(function (header) {
      header.addEventListener('click', function () {
        var col = parseInt(this.getAttribute('data-sort'));
        var tbody = table.querySelector('tbody');
        var rowsArray = Array.from(tbody.querySelectorAll('tr'));
        var ascending = this.getAttribute('data-order') !== 'asc';

        rowsArray.sort(function (a, b) {
          var aText = a.cells[col].textContent.trim().toLowerCase();
          var bText = b.cells[col].textContent.trim().toLowerCase();
          return ascending ? aText.localeCompare(bText) : bText.localeCompare(aText);
        });

        this.setAttribute('data-order', ascending ? 'asc' : 'desc');

        // Update sort icons
        headers.forEach(function (h) {
          h.querySelector('.sort-icon').textContent = '\u2195';
        });
        this.querySelector('.sort-icon').textContent = ascending ? '\u2191' : '\u2193';

        rowsArray.forEach(function (row) {
          tbody.appendChild(row);
        });
      });
    });
  }

  // Highlight active nav link
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
});
