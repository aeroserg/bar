TIME_CHOICES = []

for hour in range(12, 24):
    for minute in range(0, 60, 30):
        time_str = f"{hour:02d}:{minute:02d}"
        TIME_CHOICES.append(time_str)


print(TIME_CHOICES)