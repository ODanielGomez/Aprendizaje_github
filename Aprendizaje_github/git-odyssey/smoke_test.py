r"""Prueba funcional de la campaña completa con Selenium.

Uso:
  $env:PYTHONPATH="$env:TEMP\codex_selenium"
  python smoke_test.py
"""

from pathlib import Path
import os
import time

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait


ROOT = Path(__file__).resolve().parent
DRIVER = Path.home() / ".cache/selenium/chromedriver/win64/151.0.7922.138/chromedriver.exe"


def submit(driver, command):
    field = driver.find_element(By.ID, "terminalInput")
    field.send_keys(command)
    driver.find_element(By.CSS_SELECTOR, "#terminalForm button").click()


def finish_mission(driver, commands, advance=True):
    for command in commands:
        submit(driver, command)
    WebDriverWait(driver, 3).until(
        lambda browser: browser.find_element(By.ID, "modal").is_displayed()
    )
    if advance:
        driver.find_element(By.ID, "modalAction").click()


def main():
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-first-run")
    options.add_argument("--window-size=1440,1000")
    options.add_argument(f"--user-data-dir={ROOT / '.smoke-profile'}")
    service = Service(str(DRIVER))

    campaign = [
        ["git init"],
        ["touch README.md"],
        ["git add README.md"],
        ['git commit -m "Primer viaje"'],
        ["git branch feature/navigation"],
        ["git switch feature/navigation"],
        ["touch nav.js", "git add nav.js", 'git commit -m "Añade navegación"'],
        ["git switch main", "git merge feature/navigation"],
        ["git remote add origin https://github.com/odyssey/nave.git"],
        ["git push -u origin main"],
        ["git pull origin main", "git add README.md", 'git commit -m "Resuelve conflicto"'],
        ["git switch -c rescue", "git rebase main"],
        ["touch .gitignore", "git add .gitignore", 'git commit -m "Añade gitignore"'],
        ["touch config.js", "git diff config.js"],
        ["git restore config.js"],
        ["touch experiment.js", "git stash"],
        ["git tag v1.0.0"],
        ["git revert HEAD"],
        ["git reset --soft HEAD~1"],
        ["git reflog"],
        ["git switch -c hotfix", "git cherry-pick a1b2c3d"],
        ["git bisect start", "git bisect bad", "git bisect good a1b2c3d"],
        ['git config --global alias.lg "log --oneline --graph"'],
        ["git switch main", "git merge hotfix", "git tag v2.0.0"],
    ]

    with webdriver.Chrome(service=service, options=options) as driver:
        driver.get((ROOT / "index.html").as_uri())
        driver.execute_script("localStorage.removeItem('gitOdysseyProgress')")
        driver.refresh()
        for index, commands in enumerate(campaign):
            finish_mission(driver, commands, advance=index < len(campaign) - 1)
        final_label = driver.find_element(By.ID, "modalEyebrow").get_attribute("textContent")
        final_xp = driver.find_element(By.ID, "xpValue").text.replace(".", "")
        print(f"Estado final: label={ascii(final_label)}, xp={ascii(final_xp)}")
        assert "COMPLETADA" in final_label
        assert driver.find_element(By.ID, "modal").get_attribute("hidden") is None
        assert final_xp == "4750"
        assert len(driver.find_elements(By.CSS_SELECTOR, ".chapter")) == 6
        assert driver.find_element(By.ID, "graphSummary").text
        driver.find_element(By.ID, "modalClose").click()
        earlier_node = driver.find_elements(By.CSS_SELECTOR, ".mission-node")[0]
        driver.execute_script("arguments[0].scrollIntoView({block:'center'});", earlier_node)
        driver.execute_script("arguments[0].click();", earlier_node)
        assert driver.find_element(By.ID, "resumeMission").is_displayed()
        driver.find_element(By.ID, "resumeMission").click()
        assert "ARQUITECTO TEMPORAL" in driver.find_element(By.ID, "missionTitle").text.upper()
        driver.find_element(By.ID, "commandGuideButton").click()
        assert driver.find_element(By.ID, "commandWizard").is_displayed()
        search = driver.find_element(By.ID, "guideSearch")
        search.send_keys("git remote")
        driver.find_elements(By.CSS_SELECTOR, ".guide-list-item")[0].click()
        assert driver.find_element(By.ID, "guideCommand").text == "git remote"
        assert "ALIAS" in driver.find_element(By.ID, "guideNote").text.upper()
        driver.find_element(By.ID, "guideClose").click()
        driver.find_element(By.ID, "resetProgressButton").click()
        reset_title = driver.find_element(By.ID, "modalTitle").get_attribute("textContent")
        reset_hidden = driver.find_element(By.ID, "modal").get_attribute("hidden")
        print(f"Diálogo de reinicio: title={ascii(reset_title)}, hidden={reset_hidden}")
        assert "BORRAR TODO EL PROGRESO" in reset_title.upper()
        assert reset_hidden is None
        driver.find_element(By.ID, "modalAction").click()
        assert driver.find_element(By.ID, "xpValue").text == "0"
        assert driver.find_element(By.ID, "streakValue").text == "0"
        actions = driver.find_elements(By.CSS_SELECTOR, ".lab-action")
        wrong_action = next(item for item in actions if item.text == "git push origin main")
        driver.execute_script("arguments[0].scrollIntoView({block:'center'}); arguments[0].click();", wrong_action)
        assert "TODAVÍA NO CORRESPONDE" in driver.find_element(By.ID, "labFeedback").text.upper()
        for label in ["Editar interfaz.css", "git add interfaz.css", 'git commit -m "Mejora interfaz"']:
            actions = driver.find_elements(By.CSS_SELECTOR, ".lab-action")
            action = next(item for item in actions if item.text == label)
            driver.execute_script("arguments[0].click();", action)
        assert "CONCEPTO DOMINADO" in driver.find_element(By.ID, "masteryBadge").text.upper()
        submit(driver, "help")
        assert "reiniciar" in driver.find_element(By.ID, "terminalOutput").text
        print("OK: campaña, navegación, guía, laboratorio visual y reinicio validados.")


if __name__ == "__main__":
    main()
